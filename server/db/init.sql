-- CREATE DATABASE IF NOT EXISTS `shorten'
SELECT 'CREATE DATABASE shorten' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'shorten')\gexec