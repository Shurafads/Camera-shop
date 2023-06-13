import { ProductTab } from '../../const';
import { useAppSelector } from '../../store';
import { getProductInfo } from '../../store/products-data/products-data.selectors';

type TabCharacteristicsProps = {
  postQuery: string | null;
}

export default function TabСharacteristics({postQuery}: TabCharacteristicsProps) {

  const currentProduct = useAppSelector(getProductInfo);

  return (
    <div className={postQuery === ProductTab.Characteristics ? 'tabs__element is-active' : 'tabs__element'}>
      <ul className="product__tabs-list">
        <li className="item-list"><span className="item-list__title">Артикул:</span>
          <p className="item-list__text">{currentProduct?.vendorCode}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Категория:</span>
          <p className="item-list__text">{currentProduct?.category}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Тип камеры:</span>
          <p className="item-list__text">{currentProduct?.type}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Уровень:</span>
          <p className="item-list__text">{currentProduct?.level}</p>
        </li>
      </ul>
    </div>
  );
}
