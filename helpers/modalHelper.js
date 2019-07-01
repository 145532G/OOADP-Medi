module.exports = {
    isUnique:function(value, next) {

        User.findOne({
            where: {email: value},
            attributes: ['id']
        })
            .done(function(error, user) {

                if (error)
                    // Some unexpected error occured with the findOne method.
                    return next(error);

                if (user)
                    // We found a user with this email address.
                    // Pass the error to the next method.
                    return next('Email address already in use!');

                // If we got this far, the email address hasn't been used yet.
                // Call next with no arguments when validation is successful.
                next();

            });

    },

    isWithinRange(text, min, max) {
        // check if text is between min and max length
    }
}