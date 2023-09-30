export default async function getRandomPoem() {
  try {
    const response = await fetch(`https://poetrydb.org/random`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    const data = await response.json();
    const poem = data[0].lines.join(' ');
    return poem;
  } catch (error) {
    console.error(error);
    return 'An error occurred while fetching a random poem from the PoetryDB API.';
  }
}