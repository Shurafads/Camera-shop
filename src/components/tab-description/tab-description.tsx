import { ProductTab } from '../../const';
import { useAppSelector } from '../../store';
import { getProductInfo } from '../../store/products-data/products-data.selectors';

type TabDescriptionProps = {
  currentTab: string | null;
}

export default function TabDescription({currentTab}: TabDescriptionProps) {

  const currentProduct = useAppSelector(getProductInfo);

  return (
    <div className={currentTab === ProductTab.Description ? 'tabs__element is-active' : 'tabs__element'} data-testid="tab-description">
      <div className="product__tabs-text">
        <p>{currentProduct?.description}</p>
      </div>
    </div>
  );
}
