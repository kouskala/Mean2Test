export interface UpdateCongeInterface {
  updateConges: {
    id:string,
    title:string | null,
    dateDeb:Date
  }
}

export interface DeleteCongeInterface {
  removeConges: {
    id:string,
    title:string | null
  }
}

export interface CongesInterface {
  conges: Array<{
    title: string | null,
    dateDeb: Date | null
  }> | null;
}

export interface CongeByIdInterface {
    conges:{
      id: string,
      title: string | null,
      dateDeb: Date | null
  }
}