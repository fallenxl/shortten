import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUrlDto {
    @IsString()
    @IsNotEmpty()
    originalURL: string;

    @IsString()
    @IsOptional()
    shortURL?: string;
}
