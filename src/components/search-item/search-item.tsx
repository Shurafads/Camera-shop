import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef } from 'react';
import { AppRoute, ProductTab } from '../../const';
import { TProduct } from '../../types/product';
import { useNavigate } from 'react-router-dom';

type SearchItemProps = {
  product: TProduct;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isActive: boolean;
}

export default function SearchItem({product, setIsOpen, isActive}: SearchItemProps) {

  const navigate = useNavigate();
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.focus();
    }

  }, [isActive]);

  const handleItemClick = (productId: number) => {
    navigate(`${AppRoute.Product}/${productId}?tab=${ProductTab.Description}`);
    setIsOpen(false);
  };

  function handleKeyDown(productId: number, evt: KeyboardEvent<HTMLElement>) {
    if (evt.key === 'Enter') {
      navigate(`${AppRoute.Product}/${productId}?tab=${ProductTab.Description}`);
      setIsOpen(false);
    }
  }

  return (
    <li
      className="form-search__select-item"
      tabIndex={0}
      onClick={() =>handleItemClick(product.id)}
      onKeyDown={(evt) => handleKeyDown(product.id, evt)}
      ref={itemRef}
    >
      {product.name}
    </li>
  );
}
