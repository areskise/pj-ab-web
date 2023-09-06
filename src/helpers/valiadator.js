export const REGEX = {
    userName: /^[a-z0-9_-]{1,64}$/,
    phone: /^[0-9]+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/,
    kinect_code: /^(?!0)\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
    url: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//[\]=]*)$/,
    img: /\.(jpeg|jpg|gif|png)$/,
};

export default function validator(data) {
    if(!REGEX.userName.test(data.userName)) {
        return {value: data.userName, message: 'Tên đăng nhập không hợp lệ!'}
    }
    // if(!REGEX.email.test(data.email)) {
    //     return {value: data.email, message: 'Địa chỉ email không hợp lệ!'}
    // }
}