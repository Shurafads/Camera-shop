import { useForm } from 'react-hook-form';
import { TUserReview } from '../../types/review';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProductInfo } from '../../store/products-data/products-data.selectors';
import { postReviewAction } from '../../store/api-action';

type ModalReviewProps = {
  isActive: boolean;
  onCloseModal: () => void;
  onSubmitModal: () => void;
}

export default function ModalReview({isActive, onCloseModal, onSubmitModal}: ModalReviewProps) {
  const modalClassName = isActive ? 'modal is-active' : 'modal';

  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(getProductInfo);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<TUserReview>({
    mode: 'onBlur',
  });

  if (!currentProduct) {
    return null;
  }

  const handleFormSubmit = handleSubmit((data) => {
    const userInformation = {
      cameraId: currentProduct.id,
      userName: data.userName,
      advantage: data.advantage,
      disadvantage: data.disadvantage,
      review: data.review,
      rating: +data.rating,
      reset,
      onSubmitModal,
    };
    dispatch(postReviewAction(userInformation));
  });

  return (
    <div className={modalClassName}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseModal}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={(evt) => void handleFormSubmit(evt)}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input className="visually-hidden" id="star-5" type="radio" value="5"
                        {...register('rating',
                          {
                            required: true,
                          },
                        )}
                      />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" id="star-4" type="radio" value="4"
                        {...register('rating',
                          {
                            required: true,
                          },
                        )}
                      />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" id="star-3" type="radio" value="3"
                        {...register('rating',
                          {
                            required: true,
                          },
                        )}
                      />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" id="star-2" type="radio" value="2"
                        {...register('rating',
                          {
                            required: true,
                          },
                        )}
                      />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" id="star-1" type="radio" value="1"
                        {...register('rating',
                          {
                            required: true,
                          },
                        )}
                      />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {errors.rating && <p className="rate__message" style={{opacity: '100%'}}>Нужно оценить товар</p>}
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Введите ваше имя"
                      {...register('userName',
                        {
                          required: true,
                        },
                      )}
                    />
                  </label>
                  {errors.userName && <p className="custom-input__error" style={{opacity: '100%'}}>Нужно указать имя</p>}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Основные преимущества товара"
                      {...register('advantage',
                        {
                          required: true,
                        },
                      )}
                    />
                  </label>
                  {errors.advantage && <p className="custom-input__error" style={{opacity: '100%'}}>Нужно указать достоинства</p>}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Главные недостатки товара"
                      {...register('disadvantage',
                        {
                          required: true,
                        },
                      )}
                    />
                  </label>
                  {errors.disadvantage && <p className="custom-input__error" style={{opacity: '100%'}}>Нужно указать недостатки</p>}
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea placeholder="Поделитесь своим опытом покупки"
                      {...register('review',
                        {
                          required: true,
                          minLength: {
                            value: 5,
                            message: 'Не менее 5 символов'
                          },
                        },
                      )}
                    >
                    </textarea>
                  </label>
                  {errors.review && <div className="custom-textarea__error" style={{opacity: '100%'}}>{!errors.review.message ? 'Нужно добавить комментарий' : errors.review.message}</div>}
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModal}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
