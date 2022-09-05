import { toast } from 'react-toastify';

const options = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export default {
    success: msg => {
        return toast.success(msg, options);
    },
    error: msg => {
        return toast.error(msg, options);
    }
}