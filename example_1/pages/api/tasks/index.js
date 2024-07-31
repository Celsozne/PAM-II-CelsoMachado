import connectDB from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
import Task from "../../../models/Task";
import User from "../../../models/User";
import { jwtSecret } from "../../../lib/config";

