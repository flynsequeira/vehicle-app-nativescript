import {
    TnsOAuthClient,
    configureTnsOAuth,
    ITnsOAuthTokenResult
} from "nativescript-oauth2";
import {
    TnsOaProvider,
    TnsOaProviderOptionsFacebook,
    TnsOaProviderFacebook,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle
} from "nativescript-oauth2/providers";

export function configureOAuthProviders() {
    const googleProvider = this.configureOAuthProviderGoogle();
    const facebookProvider = this.configureOAuthProviderFacebook();

    configureTnsOAuth([googleProvider, facebookProvider]);
}

export function configureOAuthProviderGoogle(): TnsOaProvider {
    const googleProviderOptions: TnsOaProviderOptionsGoogle = {
        openIdSupport: "oid-full",
        clientId:
            "300177690999-efpm1h1vt7fskaoqa0q0eq8f35jg3ogb.apps.googleusercontent.com",
        redirectUri:
            "urn:ietf:wg:oauth:2.0:oob",
        urlScheme:
            "com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb",
        scopes: ['displayName', 'name', 'email']
    };
    const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
    return googleProvider;
}

export function configureOAuthProviderFacebook(): TnsOaProvider {
    const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
        openIdSupport: "oid-none",
        clientId: "1999345347041597",
        clientSecret: "3ae6505db94768c48ce06a415795a68f",
        redirectUri: "https://www.facebook.com/connect/login_success.html",
        scopes: ["public_profile", "email" ]
        // , "first_name", "last_name",
    };
    const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;
}