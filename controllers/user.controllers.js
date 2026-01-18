import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user-models.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler( async (req, res) => {
  // get user Details from frontend
  // verify that everything is filled
  // it shouldnt work unless an unitll all of them are done
  // verify if the password is correct 
  // check avatar is uploaded from cloudinary 
  // create user Object - create entry in db
  // check user creation 
  // return res


  // to receive the names from the body
  const {fullName, password, email, username} = req.body
  console.log(email)

  // verification if all fields are present 
  if([fullName, password, email, username].some((field) => field?.trim() == "") ){
    throw ApiError(400, "All fields are mandatory")
  }  

  // If User exists
  const existedUser = await User.findOne({
    $or: [{username}, {email}]
  })

  if(existedUser){
    throw ApiError(400, "User already Exists")
  }

  // Verify if user files is uploaded via Cloudinary
  const avatarLocalPath = req.files?.avatar[0]?.path;
  
  let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

  if(!avatarLocalPath){
    throw ApiError(400, "Avatar File wasnt able to Uploaded")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
    // this will empty the shit whatever you store here
  )

  if(!createdUser){
    throw ApiError(400, "Something went wrong while creating the User")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  )

})

export { registerUser }