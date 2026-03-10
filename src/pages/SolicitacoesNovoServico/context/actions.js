import { createCommandService } from "services";

const normalizeItem = (item) => ({
    ...item,
    camera_interna: Boolean(item.camera_interna),
    camera_externa: Boolean(item.camera_externa),
});

const actions = (dispatch) => {
    const fulfillList = (list) => ({
        type: "FETCH_LIST",
        list: (list || []).map(normalizeItem),
    });

    const fulfillOne = (data) => ({
        type: "FETCH_ONE",
        data: data ? normalizeItem(data) : null,
    });

    const fetchList = (params = {}) => {
        const qs = new URLSearchParams();
        if (params.status) qs.set("status", params.status);
        if (params.servico) qs.set("servico", params.servico);
        if (params.limit != null) qs.set("limit", params.limit);
        if (params.offset != null) qs.set("offset", params.offset);
        const query = qs.toString();
        const url = query ? `solicitacoes-novo-servico?${query}` : "solicitacoes-novo-servico";
        return createCommandService({
            url,
            method: "get",
            onSuccess: ({ data }) => {
                dispatch(fulfillList(data.list));
            },
        });
    };

    const fetchOne = (id) =>
        createCommandService({
            url: `solicitacoes-novo-servico/${id}`,
            method: "get",
            onSuccess: ({ data }) => {
                dispatch(fulfillOne(data.data));
            },
        });

    const updateOne = (id, payload) =>
        createCommandService({
            url: `solicitacoes-novo-servico/${id}`,
            method: "put",
            payload,
            onSuccess: () => fetchOne(id),
        });

    const deleteOne = (id) =>
        createCommandService({
            url: `solicitacoes-novo-servico/${id}`,
            method: "delete",
            onSuccess: () => {
                dispatch({ type: "REMOVE_FROM_LIST", id });
            },
        });

    const clearCurrent = () => dispatch({ type: "CLEAR_CURRENT" });

    return {
        fetchList,
        fetchOne,
        updateOne,
        deleteOne,
        clearCurrent,
    };
};

export default actions;
