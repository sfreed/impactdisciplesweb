export class Coupon {
    dbId: string;
    code: string;
    expiration: string;
    amountOff: number;
    discountOff: number;
    dateRedeemed: string;
    redeemedBy: string;
    orderId: string;
    isPublic: boolean;
}