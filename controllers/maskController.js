const Mask = require('../models/maskModel');
const crypto = require('crypto');
async function handleMask(req, res, next) {
    try {
        const { user, urlArray } = req.body;
        console.log(user, urlArray);
        const ans = [];
        const count = [];
        for (var i = 0; i < urlArray.length-1; i++) {
            const exists = await Mask.findOne({ orgurl: urlArray[i].name });
            if (exists) {
                ans.push({ maskedUrl: exists.maskedurl, count: exists.clickcount });
                count.push(exists.clickcount);
                continue;
            }
            const uid = crypto.randomBytes(16).toString('hex');
            const maskedurl = "http://localhost:8080/api/masker/redirect/" + uid;
            ans.push(maskedurl);
            count.push(0);
            const newMask = new Mask({ user, maskedurl, orgurl: urlArray[i].name, clickcount: 0 });
            await newMask.save();
        }
        res.status(200).send({ urlArray: ans,countArray:count, message: "Successfully Done!" });
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
        console.log(exists);
        if (!exists) {
            return res.send({ message: "false" });
        }
        await Mask.findByIdAndUpdate(
            exists._id,
            { $inc: { clickcount: 1 } }, 
            { new: true } 
        );
        res.status(301).redirect(exists.orgurl);
        //return res.status(200).send({ url: exists.orgurl, message: "true" });
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