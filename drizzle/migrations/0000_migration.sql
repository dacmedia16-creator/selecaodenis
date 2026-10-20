create table public.manager_notify_queue (
  lead_id uuid primary key,
  position int not null,
  sent_at timestamptz
);
alter table public.manager_notify_queue enable row level security;
create policy "Admins can view notify queue" on public.manager_notify_queue for select to authenticated using (public.has_role(auth.uid(),'admin'));
grant select on public.manager_notify_queue to authenticated;
grant all on public.manager_notify_queue to service_role;