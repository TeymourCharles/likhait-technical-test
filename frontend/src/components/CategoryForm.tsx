import React, { useState } from "react";
import { Button, TextField } from "../vibes";
import { createCategory } from "../services/api";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated: (category: { id: number; name: string }) => void;
}

export function CategoryForm({
  isOpen,
  onClose,
  onCategoryCreated,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const buttonRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "flex-end",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const createdCategory = await createCategory(trimmedName);
      onCategoryCreated(createdCategory);
      setName("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create category",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    if (isSubmitting) return;
    setName("");
    setError("");
    onClose();
  }

  return (
    <div style={overlayStyle} onClick={handleClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: 0 }}>Add Category</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Category Name"
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          {error && (
            <div style={{ color: "red", fontSize: "0.875rem" }}>{error}</div>
          )}

          <div style={buttonRowStyle}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}