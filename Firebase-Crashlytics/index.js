import crashlytics from '@react-native-firebase/crashlytics';

const onSignInCrash = async (user) => {
    crashlytics().log('User signed in.');
    await Promise.all([
        crashlytics().setUserId(user.uid),
        crashlytics().setUserName(user.name),
        crashlytics().setUserEmail(user.email),
        // crashlytics().setAttribute('credits', String(user.credits)),
        crashlytics().setAttributes({
            role: 'Simple-User',
        }),
    ]);
}

export default onSignInCrash;