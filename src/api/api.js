export default {
    "host": "https://lotsmall.51dmq.com",
    // "host": "http://testwww.lotsmall.cn",
    "aiPapi": {
        "getList": "/marketing/api/pat/selectProductList",
        "imgUp": "/admin/api/ui/uplode", //上传图片
        "imgDistinguish": "/marketing/api/pat/parkDistinguish", //图片识别
        'imgDetail': "/marketing/api/pat/getProductDetil", //图片相关信息
        "getRecommendList": "/marketing/api/patRecommend/getRecommendList", //获取推荐景点信息
        "getRenovationById": "/merchant/api/merchantRenovationToc/getRenovationById", //自定义页面数据
        "getUsePage": "/merchant/api/merchantRenovationToc/getUsePage", //自定义页面数据
        "selectServiceUse": "/marketing/api/market/selectServiceUse", //服务是否过期
    },
    "main": {
        "getAdress": {
            "all": '/api/area/selectRrovince'
        },
        "findPicInfo": "/merchant/api/merchantAdvManage/findPicInfo", //首页banner图
        "merchant": {
            "updateMerchantInfo": "/merchant/api/merchantInfo/doUpdateMerchantInfo",
            "listMerchantPushInfo": "/merchant/api/merchantInfo/listMerchantPushInfo", //精品推荐
            "getMerchantInfoByCode": "/merchant/api/merchantInfo/getMerchantInfoByCode",
            "getMerchantInfoByUserInfoId": "/merchant/api/merchantInfo/getMerchantInfoByUserInfoId",
            "getCorpCode": "/merchant/api/merchantWholeMarket/getMerchantWholeMarket",
            "getMerchantTemplateCode": "/merchant/api/merchantInfo/getMerchantTemplateCode",
            "getMerchantInfo": "/merchant/api/merchantInfo/getMerchantInfo", //店铺信息
            "findPayPageAd": "/merchant/api/merchantAdvManage/findPayPageAd",
            "getSearchType": "/merchant/api/merchantInfo/getSearchType", // 获取店铺可搜索类型
            "getSearchResult": "/merchant/api/merchantInfo/getIndexSearch", // 获取店铺搜索结果
        },
        "detailimgs": "/product/api/product/getPicturesByModelCode",
        "ratecode": {
            "ruleBuy": "/product/api/product/ruleBuy",
            "stockprices": "/product/api/product/getDailyStock"
        },
        "comment": {
            "upData ": "/merchant/api/merchantProdComments/doUpdateMerchantProdComments",
            "list": "/merchant/api/merchantProdComments/getMerchantProdComments",
            "add": "/merchant/api/merchantProdComments/saveMerchantProdComments",
            "iscomment": "/merchant/api/merchantProdComments/userIfEvaluate"
        },
        "marketing": {
            "couponsList": "/marketing/api/marketingCoupon/listCouponTempletVoPage",
            "getCoupon": "/marketing/api/marketingCoupon/getCouponDetailVo",
            "searchCoupon": "/marketing/api/noAuthMarketingCoupon/listCouponTemplet4C", //查询优惠券通用接口
            "myCoupons": "/marketing/api/marketingCoupon/listCouponDetailVoPage", //用户查询已领优惠券
            "useCoupons": "/marketing/api/marketingCoupon/listUseCouponDetailVo", //用户可用优惠券
            "findBuySendRule": "/marketing/api/marketBuySend/findBuySendRule",
            "verification": "/marketing/api/marketingCoupon/cancelAfterVerification", // 核销优惠券
        },
        "pay": {
            "getPayInfo": "/pay/api/getPayInfo",
            "goPay": "/order/orderPay/toPay",
            "doRefund": "/pay/api/leaguer/manage/doRefund",
            "result": "/pay/api/leaguer/manage/getPayOrder",
            "notify": "/pay/api/toAliPay/notify_url"
        },
        "wechat": {
            "Authorization": "https://open.weixin.qq.com/connect/oauth2/authorize",
            "accessToken": "https://api.weixin.qq.com/sns/oauth2/access_token",
            "token": "https://api.weixin.qq.com/cgi-bin/token",
            "getTicket": "https://api.weixin.qq.com/cgi-bin/ticket/getticket",
            "wxUserInfo": "https://api.weixin.qq.com/sns/userinfo",
            "toWxpay": "/pay/api/toWxpay/webPay",
            "tozybwxpay": "/pay/api/toWxpay/zybWebPay",
            "wxPayResult": "/pay/api/toWxpay/payResult"
        },
        "cart": {
            "add": "/cart/api/leaguer/manage/addCartItem",
            "list": "/cart/api/leaguer/manage/getCart",
            "delete": "/cart/api/leaguer/manage/removeCartItem",
            'updata': "/cart/api/leaguer/manage/updateCart"
        },
        "address": {
            "list": "/leaguer/api/userLeaguerAddress/manage/leaguerAddressPage", //收货地址列表
            "detail": "/leaguer/api/userLeaguerAddress/manage/leaguerAddressInfo", //地址详情
            "delete": "/leaguer/api/userLeaguerAddress/manage/delLeaguerAddress", //删除
            "save": "/leaguer/api/userLeaguerAddress/manage/saveLeaguerAddress", //地址保存
            'default': '/leaguer/api/userLeaguerAddress/manage/setDefaultAddress' //设置默认地址
        },
        "express": "/leaguer/api/order/manage/express",
        "order": {
            "getRecommendPark": "/leaguer/api/leaguerRecommend/getRecommentProduct"
        }
    },
    "order": {
        "saveOrder": "/order/api/saveOrder", //下单
        "detail": "/order/api/getPayOrder", //获取订单支付信息
        "timeReserveList": "/order/api/timeReserveList"
    },
    "ticket": {
        "list": {
            "pagelist": "/merchant/webapi/merchantParkInfo/merchantParkInfoGrid"
        },
        "detail": {
            "main": "/merchant/webapi/merchantParkInfo/merchantParkInfo",
            // "productItems": "/merchant/api/merchantParkTicketGrid",
            "productItems": "/merchant/webapi/merchantParkTicketGridNew",
            "getSaleStatusByModelCode": "/merchant/api/getSaleStatusByModelCode"
        },
        "order": {
            "main": "/merchant/api/leaguer/manage/merchantParkTicket"
        }
    },
    "show": {
        "list": {
            "pagelist": "/merchant/api/merchantParkInfo/merchantParkInfoGrid"
        },
        "detail": {
            "main": "/merchant/webapi/merchantShowTicketWebApi/merchantShowTicketGrid",
            "productItems": "/merchant/api/merchantParkTicketGrid",
            "getSaleStatusByModelCode": "/merchant/api/getSaleStatusByModelCode"
        },
        "order": {
            "main": "/merchant/api/leaguer/manage/merchantParkTicket"
        }
    },
    "hotel": {
        "list": {
            "pagelist": "/merchant/api/merchantHotelInfo/merchantHotelInfoGrid"
        },
        "detail": {
            "main": "/merchant/api/merchantHotelInfo/merchantHotelInfo",
            "productItems": "/merchant/api/merchantHotelRoom/merchantHotelRoomGrid"
        },
        "order": {
            "main": "/merchant/api/merchantHotelRoom/merchantHotelRoom"
        }
    },
    "shop": {
        "list": {
            "pagelist": "/merchant/api/merchantMsdeInfo/listMerchantMsdeInfo" //商品列表
        },
        "detail": {
            "main": "/merchant/api/merchantMsdeInfo/getMerchantMsdeInfo", //商品详情
            "sku": "/merchant/api/merchantMsdeInfo/getMerchantMsdeSKu" //sku
        },
        "order": {
            "main": "/merchant/api/merchantMsdeInfo/getMerchantMsdeSKu",
            "listPoint": "/product/api/shop/listPoint",
            "address": "/merchant/api/merchantMsdeInfo/getArea",
            "getPostage": "/merchant/api/merchantMsdeInfo/getPostagePrice", //获取邮费
            "getStock": "/product/api/shop/getStock",
            "selfPlace": "/leaguer/api/order/manage/selfPlace"
        }
    },
    "repast": {
        "list": {
            "pagelist": "/merchant/api/merchantRepastEatery/merchantRepastEateryGrid"
        },
        "detail": {
            "main": "/merchant/api/merchantRepastEatery/getRepastEateryVoById",
            "mealCoupon": "/merchant/api/merchantRepastEatery/getRepastCouponVoById"
        }
    },
    "route": {
        "list": {
            "pagelist": "/merchant/api/merchantRouteInfo/merchantRouteInfoGrid", //跟团游列表    
        },
        "detail": {
            "main": "/merchant/api/merchantRouteInfo/getMerchantRouteInfoById", //跟团游详情
            "listCalendarPriceMap": "/merchant/api/merchantRouteInfo/listCalendarPriceMap",
            "getRouteByMerchantParkInfoId": "/merchant/api/merchantRouteInfo/getRouteByMerchantParkInfoId"
        }
    },
    "strategy": {
        "list": {
            "pagelist": "/merchant/api/merchantStrategy/merchantStrategyGrid"
        },
        "detail": {
            "main": "/merchant/api/merchantStrategy/getMerchantStrategyById"
        }
    },
    "coupons": {
        "list": {
            "main": "/leaguer/api/coupon/couponPage",
            "member": "/leaguer/api/coupon/manage/myCoupon",
            "usableCoupons": "/leaguer/api/coupon/manage/listAbleCoupon"
        },
        "detail": {
            "main": "/leaguer/api/coupon/manage/queryCouponInfo"
        },
        "getCoupons": {
            "main": "/leaguer/api/coupon/manage/receiveCoupon"
        }
    },
    "member": {
        "login": {
            "otherLogin": "/leaguer/api/userLeaguer/thirdLogin",

        },
        "show": {
            'list': "/merchant/webapi/programmmeOrderApi/list",
            "order": "/merchant/webapi/programmmeOrderApi/order",
            "detail": "/merchant/webapi/programmmeOrderApi/detail",
            "subscribe": "/merchant/webapi/programmmeOrderApi/subscribe",
            "isSubTemplateId": "/merchant/webapi/programmmeOrderApi/isSubTemplateId"
        },
        "delOrder": '/leaguer/api/order/manage/delOrder', //删除订单
        "register": "/leaguer/api/userLeaguer/leaguerRegister",
        "logout": "/leaguer/api/userLeaguer/manage/leaguerLogout",
        "info": "/leaguer/api/userLeaguer/manage/leaguerInfo",
        "modify": "/leaguer/api/userLeaguer/manage/leaguerUpdate",
        "leaguerFixPwd": "/leaguer/api/userLeaguer/manage/leaguerFixPwd",
        "totalPerson": "/leaguer/api/other/manage/saveVisitRecord",
        "qyyxOper": "/leaguer/api/userLeaguer/manage/qyyxOper",
        "enterPromote": {
            "main": "http://192.168.200.40:8080/wap/enterPromote.htm",
            "loginWapAuthor": "http://192.168.200.40:8080/wap/loginWapAuthor.htm"
        },
        "order": {
            "pagelist": "/leaguer/api/order/manage/orderPage", //全部订单除去待付款订单
            'waitPayList': '/order/api/getPayOrderList', //待付款订单
            "detail": "/leaguer/api/order/manage/orderQuery", //订单详情
            "refund": "/leaguer/api/order/manage/retreat", //
            "cancel": "/order/api/cancelOrder", //取消订单
            "payorder": "/order/api/getPayOrderList",
            "getPayOrder": "/order/api/getPayOrder",
            "refundDetail": "/leaguer/api/order/manage/retreatDetail", //退单详情
            "warnsendgoods": "/leaguer/api/order/manage/warnSendGoods", //提醒发货
            "cancelRetreat": "/leaguer/api/order/manage/cancelRetreat", //取消退单申请
            "retreatSendGoods": "/leaguer/api/order/manage/retreatSendGoods",
            "confirmGoods": "/leaguer/api/order/manage/confirmGoods",
            "getMerchantMdseDetailByCode": "/merchant/api/merchantMsdeInfo/getMerchantMdseDetailByCode",
            "getQrCodeUrl": "/admin/api/ui/url2QrCode", //接口二维码
            "orderQueryByOrderId": "/leaguer/api/order/manage/orderQueryByOrderId"
        }
    },
    "group": {
        "selectByStatus": "/marketing/api/selectByStatus",
        "list": "/leaguer/api/order/manage/teamPage",
        "detail": "/leaguer/api/order/manage/teamQuery"
    },
    "contacts": { //常用联系人
        "getContactsList": "/leaguer/api/leaguerContacts/getContactsList",
        "saveContacts": "/leaguer/api/leaguerContacts/saveContacts",
        "deleteContacts": "/leaguer/api/leaguerContacts/deleteContacts",
        "selectContactsById": "/leaguer/api/leaguerContacts/selectContactsById",
    }
}