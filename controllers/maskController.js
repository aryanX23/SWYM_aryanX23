const Mask = require('../models/maskModel');
const crypto = require('crypto');
async function handleMask(req, res, next) {
    try {
        const { user, urlArray } = req.body;
        console.log(user,urlArray);
        const ans = [];
        for (var i = 0; i < urlArray.length-1; i++) {
            const exists = await Mask.findOne({ orgurl: urlArray[i].name });
            if (exists) {
                ans.push(exists.maskedurl);
                continue;
            }
            const uid = crypto.randomBytes(16).toString('hex');
            const maskedurl = "http://localhost:8080/api/masker/redirect/" + uid;
            ans.push(maskedurl);
            const newMask = new Mask({ user, maskedurl, orgurl: urlArray[i].name, clickcount: 0 });
            await newMask.save();
        }
        res.status(200).send({ result: ans, message: "Successfully Done!" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).send({ message: "Internal Error" });
    }
}
async function handleRedirect(req, res, next) {
    try {
        const id = req.params.id;
        const exists = await Mask.findOne({ maskedurl: "http://localhost:8080/api/masker/redirect/" + id });
        if (!exists) {
            return res.status(400).send({ message: "false" });
        }
        await Mask.findByIdAndUpdate(
            exists._id,
            { $inc: { clickcount: 1 } }, 
            { new: true } 
        );
        return res.status(200).send({ url: exists.orgurl, message: "true" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).send({ message: "Internal Error" });
    }
}

module.exports = {
    handleMask,
    handleRedirect
}