import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function DataList() {
    const [posts, setPosts] = useState<Post[]>([]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "title", headerName: "Title", width: 300 },
        { field: "body", headerName: "Body", width: 500 },
    ];

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchPosts();
    }, []);
    return (
        <>
            <div
                style={{
                    height: "400px",
                    width: "100%",
                }}
            >
                <DataGrid rows={posts} columns={columns} />
            </div>
        </>
    );
}
