import useSWR from 'swr';
import Link from 'next/link';

const URL = 'https://jsonplaceholder.typicode.com/users';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UserList() {
  const { data, error } = useSWR(URL, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log({ data });

  return (
    <div
      style={{
        margin: '20px',
        padding: '30px',
      }}
    >
      {data?.map((item) => (
        <div
          key={item.id}
          style={{
            marginBottom: '20px',
            padding: '10px',
            borderBottom: '1px solid #ddd',
          }}
        >
          <div>
            <Link href="/CSRPage">
              <a>{item.name}</a>
            </Link>
          </div>
          <div>{item.email}</div>
          <div>{item.phone}</div>
          <div>
            <a href={`http://www.${item.website}`} target="_blank" rel="noreferrer">
              {item.website}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
