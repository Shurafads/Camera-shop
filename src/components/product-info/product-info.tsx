import { useSearchParams } from 'react-router-dom';
import TabCharacteristics from '../tab-characteristics/tab-characteristics';
import TabDescription from '../tab-description/tab-description';
import { MouseEvent } from 'react';
import { ProductTab } from '../../const';

export default function ProductInfo() {

  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get('tab');

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const currentButton = evt.currentTarget;
    setSearchParams({tab: currentButton.name});
  };

  return (
    <div className="tabs product__tabs" data-testid={'product-info'}>
      <div className="tabs__controls product__tabs-controls">
        <button
          className={currentTab === ProductTab.Characteristics ? 'tabs__control is-active' : 'tabs__control'}
          type="button"
          name={ProductTab.Characteristics}
          onClick={handleButtonClick}
        >
          Характеристики
        </button>
        <button
          className={currentTab === ProductTab.Description ? 'tabs__control is-active' : 'tabs__control'}
          type="button"
          name={ProductTab.Description}
          onClick={handleButtonClick}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <TabCharacteristics currentTab={currentTab}/>
        <TabDescription currentTab={currentTab}/>
      </div>
    </div>
  );
}
