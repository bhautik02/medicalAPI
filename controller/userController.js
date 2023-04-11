const User = require('./../models/UserModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
// exports.getUser = factory.getOne(User);
// exports.getAllUsers = factory.getAll(User);

// // Do NOT update passwords with this!
// exports.updateUser = factory.updateOne(User);
// exports.deleteUser = factory.deleteOne(User);
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  // 1) Check if email and password exist
  if (!email || !password) {
    return next('provide email and password');
    // return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (
    !user ||
    password !== user.password
    // !(await user.correctPassword(password, user.password))
  ) {
    return next('Incorrect email or password');
    // return next(new AppError('Incorrect email or password', 401));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
  // 3) If everything ok, send token to client
  //   createSendToken(user, 200, req, res);
});
