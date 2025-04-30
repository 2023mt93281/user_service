const prismaClient = require('@prisma/client');

const prisma = new prismaClient.PrismaClient();

async function saveAddress(userId, addressDetails) {
    try {
        await prisma.userAddress.create({
            data: {
                userId: userId,
                label: addressDetails.label,
                addressLine1: addressDetails.addressLine1,
                addressLine2: addressDetails.addressLine2,
                city: addressDetails.city,
                state: addressDetails.state,
                country: addressDetails.country,
                postalCode: addressDetails.postalCode,
                isDefault: addressDetails.isDefault,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return "Address saved successfully";
    } catch (error) {
        throw new Error("Failed to save address", error.message);
    }
}

async function updateAddress(addressId, addressDetails) {
    try {
        const updatedAddress = await prisma.userAddress.update({
            where: { id: addressId },
            data: addressDetails,
        });
        return updatedAddress;
    } catch (error) {
        throw new Error('Failed to update address: ' + error.message);
    }
}

async function deleteAddress(addressId) {
    try {
        await prisma.userAddress.delete({
            where: { id: addressId },
        });
        return { message: 'Address deleted successfully' };
    } catch (error) {
        throw new Error('Failed to delete address: ' + error.message);
    }
}

async function getAddress(userId) {
    try {
        const addresses = await prisma.userAddress.findMany({
            where: { userId: userId},
        });
        return addresses;
    } catch (error) {
        throw new Error('Failed to retrieve addresses: ' + error.message);
    }
}

module.exports = {
    saveAddress,
    updateAddress,
    deleteAddress,
    getAddress
};