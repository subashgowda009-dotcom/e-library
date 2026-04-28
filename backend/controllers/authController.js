const User = require('../models/User');
const passport = require('passport');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        
        try {
            const user = await User.register(newUser, password);
            passport.authenticate('local')(req, res, () => {
                res.status(201).json({ message: 'Registration successful', user: { _id: user._id, username: user.username, email: user.email } });
            });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info ? info.message : 'Invalid credentials' });
        
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ message: 'Login successful', user: { _id: user._id, username: user.username, email: user.email } });
        });
    })(req, res, next);
};

exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

exports.getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ user: { _id: req.user._id, username: req.user.username, email: req.user.email } });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
};
