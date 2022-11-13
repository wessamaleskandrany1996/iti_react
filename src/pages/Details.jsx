import { useContext, useState, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import Loader from '../components/Loader';
import usePet from '../hooks/usePet';
import AdoptedPetContext from '../contexts/AdoptedPetContext';

const Modal = lazy(() => import('../components/Modal'));

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const petQuery = usePet(id);
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  let pet = petQuery?.data?.pets[0];

  return (
    <div className="details">
      {petQuery.isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {petQuery.isError && <span>{petQuery.error.message}</span>}
      {petQuery.data && (
        <div>
          <Carousel images={pet.images} />
          <h1>{pet.name}</h1>
          <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            Back
          </button>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate('/');
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;