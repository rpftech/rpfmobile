import React, {useCallback, useState} from "react";


interface ReturnType {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: () => void;
    hideModal: () => void;
}

const useModalVisibility = (): ReturnType => {
    const [visible, setVisible] = useState(false);
    const showModal = useCallback(() => setVisible(true), []);
    const hideModal = useCallback(() => setVisible(false), []);

    return {
        visible,
        setVisible,
        showModal,
        hideModal
    };
};

export default useModalVisibility;