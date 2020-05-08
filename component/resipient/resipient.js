/* eslint-disable no-unused-vars */
/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import Model from '../modal';
import {When} from '../if';
import { connect } from 'react-redux';
import { getAllDonors, addRecipient, deleteRecipient } from '../../action/index.js';



const recipientsAPI = `${process.env.REACT_APP_API}/api/v1/recipient`;

function Recipients (props){
  AOS.init();
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [updated, setUpdate] = useState({});
  const [ num, setNum] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [src, setSrc] = useState(easternfoodArray[num]);
  const [numberOfCart, setNumberOfCart] = useState(0);
  const handelInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value});
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();
    props.addRecipient(item);
    setNum(Math.floor(Math.random() * 4));
    setShowForm(false);
    setShowPost(true);
  };

  const deleteItem = id =>{
    props.deleteRecipient(id);
    setShowPost(false);
  };

  const handelUpdateChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  // const UpdteItem = e =>{
  //   e.preventDefault();
  //   const postHandeler  = updated => setRecipientList([updated]);
  //   callAPI(recipientsAPI, 'POST', updated, postHandeler );
  //   setShowUpdate(!showUpdate);
  // };

  useEffect(() => {
    props.getAllDonors();
  }, []);

  const toggleDetails = item => {
    setDetails(item);
    setShowDetails(!showDetails);
  };

  const toggleUpdate = updatedItem => {
    setUpdate(updatedItem);
    setShowUpdate(!showUpdate);
  };
  const handelUpdateCartChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const toggleCartDetails = item => {
    setDetails(item);
    setShowDetails(!showDetails);
  };

  const toggleCartUpdate = item => {
    setUpdate(item);
    setShowUpdate(!showUpdate);
  };

  const deleteCartItem = id => {
    let newCartList = cartList.filter( item => item._id !== id );
    setCartList(newCartList);
    setNumberOfCart(numberOfCart - 1);
  };

  const UpdteCartItem = e =>{
    e.preventDefault();
    setCartList(cartList.map(item => item._id === updated._id ? updated : item));
    setShowUpdate(!showUpdate);
  };
  const toggleCart = () => setShowCart(!showCart);

  const addCart = donor => {
    for (let i = 0; i < cartList.length; i++) {
      if(donor._id === cartList[i]._id) return;
    }
    setCartList([...cartList, donor]);
    setNumberOfCart(numberOfCart + 1);
  };
  const toggleForm = e => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  return (
    <>
      <section className="block-donor">
        <div className="donation-div">
          <h3 data-aos="zoom-in-up" data-aos-duration="1000" className="donor-header">Recipients</h3>
          <span className="space-span"></span>
          <p data-aos="fade-left" data-aos-duration="1000" className="res-p">“Service to others is the rent you pay for your room here on earth”</p>
          <p data-aos="fade-right" data-aos-duration="1000" className="res-p">“We make a living by what we get, but we make a life by what we give”</p>
          <div className="donation-href-div">
            <div className="cart-div" data-aos="fade-right"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine">
              <header className="cart-count">{numberOfCart}</header>
              <i className="fa fa-cart-plus curt-item" aria-hidden="true" onClick={toggleCart} ></i></div>
            { !showForm &&  (<button  data-aos="zoom-in-up" data-aos-duration="1000" onClick={toggleForm} className="donation-button"> Make a Request</button>)}
          </div>
          {showForm && (
            <Model title='Recipient Form' close={toggleForm}>
              <div className="addMeal-div">
                <div className="addMeal-form" >
                  <form onSubmit={addItem} className="add-form">
                    <label className="form-lable-">Recipient name:</label>
                    <input type='text' name='name' placeholder='type your name' className="update-input" onChange={handelInputChange} required />

                    <label className="form-lable-">Select the type :</label>
                    <div className="form-lable-r">

                      <label>
                        <input type='radio' name='requestType' className="update-input-r" value='eastern food'  onClick={handelInputChange} required /> Eastern Food
                      </label>
                      <label>
                        <input type='radio' name='requestType' className="update-input-r" value='fast food' onClick={handelInputChange} required /> Fast Food
                      </label>
                      <label>
                        <input type='radio' name='requestType' className="update-input-r" value='desserts' onClick={handelInputChange} required />Desserts
                      </label>
                    </div>
                    <label className="form-lable-">Identity:</label>
                    <input type='text' name='identity' className="update-input" placeholder='type your identity' onChange={handelInputChange} required />
                    <label className="form-lable-"> Contact Number</label>
                    <input type='number' className="update-input" name='contactNumber' placeholder=' +962-xxxxxxxxx' onChange={handelInputChange} required />
                    <label className="form-lable-">Description :</label>
                    <input type='text' className="update-input" name='description' placeholder='description' onChange={handelInputChange} />
                    <button className="form-button-">Submit</button>
                  </form>
                </div>
              </div>
            </Model>
          )}
        </div>
        {showPost && (
          <>
            <div className="donor-line-section- div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
              <div className="donor-item section-item">
                {/* <img src={src}className="section-donor-item-img" height="330px" width="300px" /> */}
                <div className="section-info">
                  <div className="section-donor-name">{ props.newRecipient.name}</div>
                  <div className="section-donor-type">{ props.newRecipient.identity}</div>
                  <div className="section-donor-type">{ props.newRecipient.requestType}</div>
                  <div className="section-donor-type">{ props.newRecipient.contactNumber}</div>
                  <div className="section-donor-type">{ props.newRecipient.description}</div>
                </div>
                <div className="section-button">
                  <button onClick={()=> deleteItem( props.newRecipient._id)} className="donor-item-button-section-"><i className="fa fa-close info"></i>DELETE</button>
                </div>
              </div>
            </div>
            <div className="result-req-div">
              {/*<h3 data-aos="zoom-in-up" data-aos-duration="1500" className="recipient-header"> Results Match Your Request: {props.newRecipient.requestRecipient.length}</h3> */}
              <section className="block-recipient">
                <div className="recipient-list">
                  { props.newRecipient.requestRecipient &&
                    props.newRecipient.requestRecipient.map((item, idx)=>{
                      return <div key={idx} className="donor-line div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
                        <div className="donor-item">
                          {/* <img src={src} className="donor-item-img" height="330" width="300" /> */}
                          <div className="donor-item-name">
                            {item.name}
                          </div>
                        </div>
                        <div className="styles-div">
                          <div className="donor-item-div1-" data-aos="fade-right"
                            data-aos-duration="1500" ></div>
                          <div className="donor-item-div2-"data-aos="fade-left"
                            data-aos-duration="1700"></div>
                        </div>
                        <div className="div-buttons">
                          <button onClick={()=> toggleDetails(item)} className="donor-item-button"><i className="fa fa-address-card-o info"></i>More Detail</button>
                          <button onClick={()=> addCart(item)}  className="donor-item-button"><i className="fa fa-cart-plus cart" ></i>Add To Cart</button>
                        </div>
                      </div>;
                    })
                  }
                </div>
              </section>
            </div>
          </>
        )}

      </section>
      <h4 data-aos="zoom-in-up" data-aos-duration="1500" className="recipient-header"> Available Donors</h4>
      <section className="block-recipient">
        <div className="recipient-list">
          {props.donors.results && props.donors.results.map((item, i)=>{
            let src = item.type === 'eastern food' ? easternfoodArray[num] : item.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
            return <div key={i} className="donor-line div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
              <div className="donor-item">
                {/* <img src={src} className="donor-item-img" height="330" width="300"/> */}
                <div className="donor-item-name">{item.name}</div>
              </div>
              <div className="styles-div">
                <div className="donor-item-div1" data-aos="fade-right"
                  data-aos-duration="1500" ></div>
                <div className="donor-item-div2"data-aos="fade-left"
                  data-aos-duration="1700"></div>
              </div>
              <div className="div-buttons">
                <button onClick={()=> toggleDetails(item)} className="donor-item-button"><i className="	fa fa-address-card-o info"></i>More Details</button>
                <button onClick={()=> addCart(item)} className="donor-item-button"><i className="fa fa-cart-plus cart" ></i>Add To Cart</button>
              </div>
            </div>;
          })}
        </div>

        <When condition={showDetails}>
          <Model title='Donor Details' close={toggleDetails}>
            <div className="recipient-details donor-details">
              <div className="detail-info">
                <div className="detail-name"><span>Name: </span> {details.name}   </div>
                <div className="detail-type"><span>Donation Type:</span>  {details.type}   </div>
                <div className="detail-type"><span>Available Time:</span>  {details.available_time}</div>
                <div  className="detail-type"><span>Food Amount:</span>  {details.amount}</div>
              </div>
            </div>
          </Model>
        </When>


        <When condition={showCart}>
          <Model title='Cart List' close={toggleCart}>

            {
              cartList.map((item, i)=>{
                return <div key={i}>
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-button-div">
                    <button onClick={()=> toggleCartDetails(item)} className="update-button-cart"><i className="	fa fa-address-card-o info"></i>More Detail</button>
                    <button onClick={()=> toggleCartUpdate(item)} className="update-button-cart"><i className="		fa fa-pencil-square info"></i>Update</button>
                    <button onClick={()=> deleteCartItem(item._id)} className="update-button-cart"><i className="fa fa-close info"></i>DELETE</button>
                  </div>
                </div>;
              })
            }

            <When condition={showDetails}>
              <div className="cart-details-m">
                <Model title='Donor details'  close={toggleDetails}>
                  <div className="recipient-details donor-details">
                    <div className="detail-info">
                      <div className="detail-name"><span>Name: </span> {details.name}   </div>
                      <div className="detail-type"><span>Donation Type:</span>  {details.type}   </div>
                      <div className="detail-type"><span>Available Time:</span>  {details.available_time}</div>
                      <div  className="detail-type"><span>Food Amount:</span>  {details.amount}</div>
                    </div>
                  </div>
                </Model>
              </div>
            </When>
            <When condition={showUpdate}>
              <div className="cart-details-m">
                <Model title='cart update' close={toggleUpdate}>
                  <div className="recipient-updated cart-updated">
                    <form onSubmit={UpdteCartItem} value={details._id}className="update-form">
                      <label className="update-label">
                        <input type='hidden' className="update-input" name='_id' value={details._id} />
                      </label>
                      <label className="update-label" >Name :</label>
                      <input type='text' name='name' placeholder='type your name' className="update-input" defaultValue={updated.name} onChange={handelUpdateChange} required />

                      <div className="redio-div">
                        <label className="update-label-r">
                          <input type='radio' name='type' value='eastern food' className="update-input-r" onClick={handelUpdateChange} required />Eastern Food
                        </label>
                        <label className="update-label-r">
                          <input type='radio' name='type' value='fast food' className="update-input-r" onClick={handelUpdateChange} required />Fast Food
                        </label>
                        <label className="update-label-r">
                          <input type='radio' name='type' value='desserts' className="update-input-r" onClick={handelUpdateChange} required />Desserts
                        </label>
                      </div>
                      <label className="update-label" ><span>available_time</span> </label>
                      <input type='text' name='available_time' className="update-input" placeholder='type your available_time' defaultValue={updated.available_time} onChange={handelUpdateChange} required />

                      <label className="update-label"> <span>amount</span>  </label>
                      <input type='number' name='amount' className="update-input" placeholder='type your amount' defaultValue={updated.amount} onChange={handelUpdateChange} />

                      <button className="update-button">Submit</button>
                    </form>
                  </div>
                </Model>
              </div>
            </When>
          </Model>
        </When>
        <div className="spasee-div"></div>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  donors: state.reducer.donorItems,
  newRecipient: state.reducer.newRecipientItem,
});
const mapDispatchToProps = { getAllDonors, addRecipient, deleteRecipient };
export default connect(mapStateToProps, mapDispatchToProps)(Recipients);