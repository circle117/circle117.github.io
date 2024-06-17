export default function TimelineItem({ data, key }) {
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        {data.category && (
          <span className="tag" style={{ background: data.category.color }}>
            {data.category.tag}
          </span>
        )}
        <time>{data.date}</time>
        <p className="text-md my-2">{data.text}</p>
        <p className="text-sm mb-2 text-gray-500">{data.skills}</p>
        {data.link && (
          <a href={data.link.url} target="_blank" rel="noopener noreferrer">
            {data.link.text}
          </a>
        )}
        <span className="circle" />
      </div>
    </div>
  );
}
