const handleAdminDeletePost = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleAdminDeletePost(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const postId: string = req.body.postId;

  try {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const deletedPost: number = await Post.destroy({
      where: { id: postId },
    });

    if (deletedPost === 0) {
      return res.status(500).json({ error: "Falha ao deletar Post!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};
