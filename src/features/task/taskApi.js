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
      query: ({ id, data, email }) => ({
        url: `/api/v1/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.data?.modifiedCount > 0) {
            dispatch(
              apiSlice.util.updateQueryData("getMyTask", arg.email, (draft) => {
                const updatedTask = draft?.data?.find(
                  (task) => task._id == arg.id
                );

                if (updatedTask) {
                  updatedTask.title = arg.data.title;
                  updatedTask.description = arg.data.description;
                }
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getSingleTask", arg.id, (draft) =>
                {
                  draft.data.title = arg.data.title;
                  draft.data.description = arg.data.description;
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    deleteTask: builder.mutation({
      query: ({ id, email }) => ({
        url: `/api/v1/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          console.log(arg);
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getMyTask", arg.email, (draft) =>
              // console.log(JSON.parse(JSON.stringify(draft)))
              {
                return {
                  ...draft,
                  data: draft.data.filter((task) => task._id !== arg.id),
                };
              }
            )
          );
        } catch (error) {}
      },
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
