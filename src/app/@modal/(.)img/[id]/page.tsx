
import {getImage} from "@/server/queries";
import { Modal } from "./modal";
import  {FullPageImageView}  from "@/common/full-image-page"

export default function PhotoModal({ 
  params: { id: photoId },
}: {
    params: { id: string };
    }) {
      const idAsNumber = Number(photoId);
      if (Number.isNaN(idAsNumber)) throw new Error("Invalid photoId");
      return (
      <Modal>
        <FullPageImageView photoId={photoId}/>
      </Modal>
      );
    }