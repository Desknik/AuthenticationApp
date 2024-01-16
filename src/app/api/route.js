export async function GET()
{
  return Response.json(
	{nomes: "Hello World!"}, 
	{status: 200})
}