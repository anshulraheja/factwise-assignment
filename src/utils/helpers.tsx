export interface Person {
  id: number;
  name: string;
  DOB: string;
  gender: string;
  country: string;
  description: string;
}

export const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
};
