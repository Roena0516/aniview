import { NextPage } from 'next';
import { GalleryPage } from './_features/ui/GalleryPage';
import { mockGalleryData } from './_entities/model/mockGalleryData';

const Gallery: NextPage = () => {
  return <GalleryPage tierlists={mockGalleryData} />;
};

export default Gallery;
