import React from 'react';
import { useForm } from 'react-hook-form';
import AnimateModal from '../../AnimateModal';
import './ModalAddFriendStyle.scss';
import './ModalAddAdaptive.scss';

const ModalAddFriend = ({visable, setVisable}) => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        reset();
    };

    const CloseModal = () => {
        reset();
        setVisable(false);
    };

    const rootClasses = ['modalAddFr'];

    if (visable == true) {
        rootClasses.push('modalAddFr-Active');
    }

    return (
        <AnimateModal nameClass="modalAddFr-Active" onClick={() => CloseModal()}>
            <div className='modalAddFr-container' onClick={(e) => e.stopPropagation()}>
                <button className='btn-close-modalAddFr' onClick={() => CloseModal()}>
                    <img src="/img/close.svg" alt="" />
                </button>
                <p className="title-modalAddFr">Добавьте игрока</p>

                <form onSubmit={handleSubmit(onSubmit)} className='form-addFr'>
                    <div className='field-form'>
                        <label htmlFor="name-addFr">ФИО</label>

                        <input className={!errors?.name ? 'input-form' : 'input-form input-err'} id='name-addFr' placeholder='Иванов Иван Иванович' type='text' {...register('name', {
                            required: "Поле обязательно к заполнению",
                        })} />
                            
                        {errors?.name && <p className='error-form'>{errors?.name?.message || "Error!"}</p>}
                    </div>

                    <div className='age-gender-wrapper'>
                        <div className='age-gender-container'>
                            <div className='age-block'>
                                <label htmlFor="age-addFr">Возраст</label>
                                <input className={!errors?.age ? 'input-form' : 'input-form input-err'} id='age-addFr' placeholder='0' type='number' {...register('age', {
                                    required: "Поле обязательно к заполнению",
                                    valueAsNumber: true,
                                })} />

                            </div>

                            <div className='gender-block'>
                                <label htmlFor="">Пол</label>
                                <div className='gender-radio-bl'>
                                    <label htmlFor="woman">
                                        <input
                                            {...register("gender", {
                                                required: "Поле обязательно к заполнению",
                                            })}
                                            type="radio"
                                            name="gender"
                                            value="woman"
                                            id="woman"
                                        />
                                        <img src="/img/woman.svg" alt="" />
                                    </label>
                                    <label htmlFor="man">
                                        <input
                                            {...register("gender", {
                                                required: "Поле обязательно к заполнению",
                                            })}
                                            type="radio"
                                            name="gender"
                                            value="man"
                                            id="man"
                                        />
                                        <img src="/img/man.svg" alt="" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {errors?.age && <p className='error-form'>{errors?.age?.message || "Error!"}</p>}
                    </div>
                    
                    <input className='btn-form' type="submit" disabled={!isValid} value={"Добавить"}/>
                </form>
            </div>
        </AnimateModal>
    )
}

export default ModalAddFriend