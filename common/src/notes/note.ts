export default interface Note {
  id: string;
  title: string;

  subtitle: string;
  text: string;
  imageUrl: string;

  dateCreated: Date;
  dateModified: Date;
}
