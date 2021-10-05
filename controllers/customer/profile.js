const Joi = require('joi');
const _ = require('lodash');

const Customer = require('../../models/Customer');

const viewProfileInformation = async (req, res) => {
    const profile = await Customer.getProfileInformation(req.user.customer_id, req.user.privilege_level);
    console.log("Profile");
    req.session.profile = profile;
    return res.render('customer/profile', {
        customerExists: true,
        profile: profile,
        privilege_level: req.user.privilege_level,
    });
}
module.exports.viewProfileInformation = viewProfileInformation;