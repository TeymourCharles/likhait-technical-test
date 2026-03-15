import React, { useState } from "react";
import { Button, TextField } from "../vibes";
import { createCategory } from "../services/api";

interface CategoryFormProps {
  onCancel: () => void;
  onCategoryCreated: (category: { id: number; name: string }) => void;
}

export function CategoryForm({
  onCancel,
  onCategoryCreated,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const buttonRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "flex-end",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
    fontSize: "0.875rem",
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
      onCancel();
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
    onCancel();
  }

  return (
      <div onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <TextField
            label="Category Name"
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            fullWidth
            required
          />

          {error && (
            <div style={errorStyle}>{error}</div>
          )}

          <div style={buttonRowStyle}>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
             <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
  );
}