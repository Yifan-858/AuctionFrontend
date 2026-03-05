import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuction } from "../services/auctionService";
import type { AuctionCreate } from "../types/Auction";

const CreateAuction = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<AuctionCreate>({
    id: 0,
    title: "",
    description: "",
    startPrice: 1,
    startDateUtc: "",
    endDateUtc: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const created = await createAuction(form);
      navigate(`/auction/${created.id}`);
    } catch (err) {
      setError("Failed to create auction");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Auction</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="startPrice"
          placeholder="Start Price"
          value={form.startPrice}
          onChange={handleChange}
          required
        />

        <label>Start Date</label>
        <input
          type="datetime-local"
          name="startDateUtc"
          value={form.startDateUtc}
          onChange={handleChange}
          required
        />

        <label>End Date</label>
        <input
          type="datetime-local"
          name="endDateUtc"
          value={form.endDateUtc}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Auction</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateAuction;
