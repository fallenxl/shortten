import config from "@/config";
import { ICreateURL, IUrl, IUrlState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";

const initialState: IUrlState = {
  urls: [] as IUrl[],
  isLoading: true,
  isCreateLoading: false,
  isError: null,
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    startCreateLoading: (state) => {
      state.isCreateLoading = true;
      state.isError = null;
    },
    createLoadingFailed: (state) => {
      state.isCreateLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
      state.isError = null;
    },
    loadingFailed: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    loadingSuccess: (state) => {
      state.isLoading = false;
      state.isError = null;
    },
    addURL: (state, action) => {
      state.urls.unshift(action.payload);
      state.isCreateLoading = false;
    },
    setURLs: (state, action) => {
      state.urls = action.payload;
      state.isLoading = false;      
    },
    removeURL: (state, action) => {
      state.urls = state.urls.filter((url) => url.id !== action.payload);
    },
  },
});

export const {
  addURL,
  setURLs,
  removeURL,
  startLoading,
  loadingFailed,
  loadingSuccess,
  startCreateLoading,
  createLoadingFailed
} = urlSlice.actions;
export default urlSlice.reducer;

export const createURL =
  (url: ICreateURL) =>
  async (dispatch: Dispatch): Promise<void | string> => {
    try {
      dispatch(startCreateLoading());
      const res = await axios.post<IUrl>(config.API_URL + "api/url/create", url);
      if (typeof res === "string") {
        dispatch(createLoadingFailed());
        return res;
      }
      if (!res.data.userID) {
        const urls = localStorage.getItem("urls");
        if (urls) {
          const urlsArray = JSON.parse(urls);
          urlsArray.unshift(res.data);
          localStorage.setItem("urls", JSON.stringify(urlsArray));
        } else {
          localStorage.setItem("urls", JSON.stringify([res.data]));
        }
      }
    
      dispatch(addURL(res.data));
    } catch (error) {
      dispatch(loadingFailed("The slug is already taken."));
    }
  };

export const getURLs = () => async (dispatch: Dispatch) => {
  try {
    dispatch(startLoading());
    const res = await axios.get<IUrl[]>(config.API_URL + "api/url/all");
    if (typeof res === "string") {
      dispatch(loadingFailed(res));
      console.log(`Error: ${res}`);
    }
    dispatch(setURLs(res.data));
  } catch (error) {
    throw error;
  }
};

export const getURLsFromLocalStorage = () => (dispatch: Dispatch) => {
  const urls = localStorage.getItem("urls");
  if (urls) {
    const sortedURLs = JSON.parse(urls).sort(
      (a: IUrl, b: IUrl) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    dispatch(setURLs(sortedURLs));

  }else{
    dispatch(loadingSuccess());
  }

};

export const deleteURL = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(startLoading());
    await axios.delete(config.API_URL + `api/url/delete/${id}`);
    dispatch(removeURL(id));
    dispatch(loadingSuccess());
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
