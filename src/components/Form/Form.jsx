import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [clicked, setClicked] = useState(false);
    const [subject, setSubject] = useState('physical');
    const { tg, queryId } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            queryId,
            country,
            street,
            subject
        }
        fetch('http://188.93.210.188:3089/web-data', {
            title: "Title of post",
            body: JSON.stringify(data)
        })
    }, [clicked])


    const sendClicked = () => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [sendClicked])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        // if(!street || !country) {
        //     tg.MainButton.hide();
        // } else {
        tg.MainButton.show();
        // }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Улица'}
                value={street}
                onChange={onChangeStreet}
            />
            <button onClick={() => onSendData()}>SEND</button>
        </div>
    );
};

export default Form;
