import React, { useState } from "react";
import {
  X,
  Upload,
  Calendar,
  Link,
  FileText,
  Tag,
  Monitor,
} from "lucide-react";
import type { Event } from "../../../../types/event";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent?: (
    eventData: Omit<
      Event,
      "id" | "organizer" | "status" | "stats" | "isLiked" | "isSaved"
    >
  ) => void;
  isLoading: boolean;
  error: string | null;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onCreateEvent,
  isLoading,
  error,
}) => {
  const [formData, setFormData] = useState<
    Omit<Event, "id" | "organizer" | "status" | "stats" | "isLiked" | "isSaved">
  >({
    type: "",
    imageUrl: "",
    title: "",
    details: {
      date: "",
      platform: "",
    },
    description: "",
    liveUrl: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const categories = [
    "Technologie",
    "Business",
    "Éducation",
    "Santé",
    "Art & Culture",
    "Sport",
    "Networking",
    "Formation",
    "Conférence",
    "Atelier",
    "Autre",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (["date", "platform"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("L'image ne doit pas dépasser 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        setFormData((prev) => ({
          ...prev,
          imageUrl: base64String,
          imageMetadata: {
            name: file.name,
            size: file.size,
            type: file.type,
          },
        }));

        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.type ||
      !formData.details.date ||
      !formData.liveUrl ||
      !formData.imageUrl ||
      !formData.details.platform
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const eventDataToCreate: Omit<
      Event,
      "id" | "organizer" | "status" | "stats" | "isLiked" | "isSaved"
    > = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      imageUrl: formData.imageUrl,
      details: {
        date: formData.details.date,
        platform: formData.details.platform,
      },
      liveUrl: formData.liveUrl,
    };

    console.log("Nouvel événement créé:", eventDataToCreate);

    if (onCreateEvent) {
      onCreateEvent(eventDataToCreate);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Likita
            </div>
            <span className="text-gray-400">•</span>
            <h2 className="text-lg font-semibold text-gray-800">
              Nouvel événement
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Erreur: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <FileText className="w-4 h-4" />
                Titre de l'événement *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Hackathon Innovation Tech"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <Tag className="w-4 h-4" />
                Catégorie *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                disabled={isLoading}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Décrivez votre événement en détail..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <Calendar className="w-4 h-4" />
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.details.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="platform"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <Monitor className="w-4 h-4" />
                  Plateforme *
                </label>
                <input
                  type="text"
                  id="platform"
                  name="platform"
                  value={formData.details.platform}
                  onChange={handleInputChange}
                  placeholder="Ex: Zoom, Google Meet"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="liveUrl"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <Link className="w-4 h-4" />
                  Lien de l'évenement *
                </label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://exemple.com/inscription"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Upload className="w-4 h-4" />
                Image de l'événement *
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isLoading}
                />
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">
                          Changer l'image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        Cliquez pour ajouter une image
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG jusqu'à 10MB
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium order-2 sm:order-1"
                disabled={isLoading}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 order-1 sm:order-2 flex-1 sm:flex-none flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? "Chargement en cours..." : "Créer l'événement"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
