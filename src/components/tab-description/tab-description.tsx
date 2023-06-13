import { ProductTab } from '../../const';
import { useAppSelector } from '../../store';
import { getProductInfo } from '../../store/products-data/products-data.selectors';

type TabDescriptionProps = {
  postQuery: string | null;
}

export default function TabDescription({postQuery}: TabDescriptionProps) {

  const currentProduct = useAppSelector(getProductInfo);

  return (
    <div className={postQuery === ProductTab.Description ? 'tabs__element is-active' : 'tabs__element'}>
      <div className="product__tabs-text">
        <p>{currentProduct?.description}</p>
      </div>
    </div>
  );
}
