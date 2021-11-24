const connectDB =require("./startup/db");
const express = require("express");

connectDB();
const app = express();