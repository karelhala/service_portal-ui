export const scrollToTop = () => document.getElementById('root').scrollTo({
  behavior: 'smooth',
  top: 0,
  left: 0
});

export const filterServiceOffering = ({ display_name, name }, filter) => {
  const filterAtrribute = display_name || name;
  return filterAtrribute.trim().toLowerCase().includes(filter.toLowerCase());
};
