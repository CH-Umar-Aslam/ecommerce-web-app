import React, { useEffect } from 'react';
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, [dispatch]);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  // Randomizing the products in the list
  const tempProducts = [];
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  // Filtering products by category
  const catProductsOne = products.filter(product => product.category === (categories[0]?.slug || ''));
  const catProductsTwo = products.filter(product => product.category === (categories[1]?.slug || ''));
  const catProductsThree = products.filter(product => product.category === (categories[2]?.slug || ''));
  const catProductsFour = products.filter(product => product.category === (categories[3]?.slug || ''));

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
            </div>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[0]?.name || 'Default Category Name'}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
            </div>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[1]?.name || 'Default Category Name'}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
            </div>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[2]?.name || 'Default Category Name'}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
            </div>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[3]?.name || 'Default Category Name'}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
