const addressService = require('../services/addressService');
const sessionService = require('../services/sessionService');

exports.saveAddress = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const addressDetails = req.body;
        const validReq = await sessionService.validateRequest(req);
        if (validReq.status === 401) {
            return res.status(401).json({ error: validReq.res });
        }
        const result = await addressService.saveAddress(userId, addressDetails);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateAddress = async (req, res) => {
    try {
        const addressId = Number(req.params.id);
        const addressDetails = req.body;
        const validReq = await sessionService.validateRequest(req);
        if (validReq.status === 401) {
            return res.status(401).json({ error: validReq.res });
        }
        const result = await addressService.updateAddress(addressId, addressDetails);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAddress = async (req, res) => {
    try {
        const addressId = Number(req.params.id);
        const validReq = await sessionService.validateRequest(req);
        if (validReq.status === 401) {
            return res.status(401).json({ error: validReq.res });
        }
        const result = await addressService.deleteAddress(addressId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getUserAddress = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const validReq = await sessionService.validateRequest(req);
        if (validReq.status === 401) {
            return res.status(401).json({ error: validReq.res });
        }
        const result = await addressService.getAddress(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}