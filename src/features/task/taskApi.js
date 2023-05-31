import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyTask: builder.query({
      query: (email) => ({
        url: `/api/v1/tasks/${email}`,
      }),
    }),
    getSingleTask: builder.query({
      query: (id) => ({
        url: `/api/v1/tasks/single-task/${id}`,
      }),
    }),
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/api/v1/tasks/create-task",
        method: "POST",
        body: taskData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, 14);
          dispatch(
            apiSlice.util.updateQueryData("getMyTask", arg.email, (draft) => {
              draft.data.push(data.data);
            })
          );
        } catch (error) {}
      },
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/api/v1/tasks/${id}`,
        method: "DELETE",
      }),
    }),
    editCompleted: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/tasks/completed/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetMyTaskQuery,
  useGetSingleTaskQuery,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useEditCompletedMutation,
} = taskApi;
