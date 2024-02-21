import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function FooterSubscribe() {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    const isValidEmail = email.match(/\S+@\S+\.\S+/);
    setIsButtonDisabled(!isValidEmail);
  }, [email]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const postData = {
        email: email,
        firstName: '',
        lastName: '',
        createdDate: new Date(), 
      };

      const response = await fetch('/api/attendees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Subscription updated');
        setEmail('');
      } else {
        alert('Failed to update subscriptio, try again later');
      }

    } catch (err) {
      console.error('Error in fetch: ', err);
      alert('Error occured, try again later');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <h5 className="text-uppercase mb-4">Stay Updated</h5>
    <form onSubmit={handleSubmit}>
      <div className="d-flex">
        <input
          type="email"
          className="form-control me-2"
          placeholder="Email address"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button
          type="submit"
          className="btn btn-outline-dark"
          disabled={isButtonDisabled || isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
    </form>
  </>
  )
}