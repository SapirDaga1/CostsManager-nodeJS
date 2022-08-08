import React from 'react'
import Alert from 'react-popup-alert'

const PopupMessage = () => {
    const [alert, setAlert] = React.useState({
        type: '',
        text: '',
        show: false
    })

    function onCloseAlert() {
        setAlert({
            type: '',
            text: '',
            show: false
        })
    }

    function onShowAlert(type, message) {
        setAlert({
            type: type,
            text: message,
            show: true
        })
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                <button onClick={() => onCloseAlert()}>Hide alert</button>
                <button onClick={() => onShowAlert('success')}>
                    Show success alert
                </button>
                <button onClick={() => onShowAlert('error')}>Show error alert</button>
                <button onClick={() => onShowAlert('warning')}>
                    Show warning alert
                </button>
            </div>
            <Alert
                header={alert.type}
                btnText={'Close'}
                text={alert.text}
                type={alert.type}
                show={alert.show}
                onClosePress={onCloseAlert}
                pressCloseOnOutsideClick={true}
                showBorderBottom={true}
                alertStyles={{}}
                headerStyles={{}}
                textStyles={{}}
                buttonStyles={{}}
            />
        </div>
    )
}

export default PopupMessage